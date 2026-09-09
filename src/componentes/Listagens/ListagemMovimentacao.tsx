import {
    useState,
    useEffect,
    type JSX,
    type ChangeEvent,
} from "react";
import type MovimentacaoDTO  from "../../dto/MovimentacaoDTO";
import MovimentacaoRequests from "../../fetch/MovimentacaoRequest";
import { useNavigate } from "react-router-dom";

function ListagemMovimentacoes(): JSX.Element {
    const [movimentacoes, setMovimentacoes] = useState<MovimentacaoDTO[]>([]);
    const [busca, setBusca] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [carregando, setCarregando] = useState(true);

    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarMovimentacoes = async () => {
            try {
                setCarregando(true);

                const listaDeMovimentacoes =
                    await MovimentacaoRequests.obterListaDeMovimentacoes();

                // Normaliza os dados recebidos da API para evitar
                // valores undefined/NaN na tabela.
                const movimentacoesNormalizadas: MovimentacaoDTO[] = (
                    listaDeMovimentacoes ?? []
                ).map((movimentacao: MovimentacaoDTO) => {
                    const item = movimentacao as MovimentacaoDTO & {
                        tipo?: string | null;
                        tipoMovimentacao?: string | null;
                        preco?: number | string | null;
                        precoUnitario?: number | string | null;
                        valorTotal?: number | string | null;
                    };

                    const motivo = String(item.motivo ?? "").trim();

                    const tipoRecebido = String(
                        item.tipo_movimentacao ??
                            item.tipo ??
                            item.tipoMovimentacao ??
                            ""
                    )
                        .trim()
                        .toUpperCase();

                    let tipo = tipoRecebido;

                    if (!tipo) {
                        if (/recebimento|entrada/i.test(motivo)) {
                            tipo = "ENTRADA";
                        } else if (/sa[ií]da|retirada/i.test(motivo)) {
                            tipo = "SAÍDA";
                        } else {
                            tipo = "—";
                        }
                    }

                    const precoConvertido = Number(
                        item.preco_unitario ??
                            item.preco ??
                            item.precoUnitario
                    );

                    const precoUnitario = Number.isFinite(precoConvertido)
                        ? precoConvertido
                        : 0;

                    const valorConvertido = Number(
                        item.valor_total ?? item.valorTotal
                    );

                    const valorTotal = Number.isFinite(valorConvertido)
                        ? valorConvertido
                        : Number(item.quantidade ?? 0) * precoUnitario;

                    return {
                        ...movimentacao,
                        tipo_movimentacao: tipo,
                        preco_unitario: precoUnitario,
                        valor_total: Number.isFinite(valorTotal)
                            ? valorTotal
                            : 0,
                    };
                });

                setMovimentacoes(movimentacoesNormalizadas);
            } catch (error) {
                console.error(
                    `Erro ao buscar movimentações. ${error}`
                );

                alert(
                    "Erro ao carregar a listagem de movimentações."
                );
            } finally {
                setCarregando(false);
            }
        };

        buscarMovimentacoes();
    }, []);

    /* FILTRO */
    const movimentacoesFiltradas = movimentacoes.filter((movimentacao) => {
        const termo = busca.toLowerCase().trim();

        if (!termo) {
            return true;
        }

        return (
            movimentacao.motivo?.toLowerCase().includes(termo) ||
            movimentacao.observacao?.toLowerCase().includes(termo) ||
            movimentacao.tipo_movimentacao?.toLowerCase().includes(termo) ||
            String(movimentacao.id_produto).includes(termo)
        );
    });

    /* PAGINAÇÃO */
    const totalPages = Math.max(
        1,
        Math.ceil(
            movimentacoesFiltradas.length / rowsPerPage
        )
    );

    const indexOfLastRow =
        currentPage * rowsPerPage;

    const indexOfFirstRow =
        indexOfLastRow - rowsPerPage;

    const currentMovimentacoes =
        movimentacoesFiltradas.slice(
            indexOfFirstRow,
            indexOfLastRow
        );

    const paginate = (pageNumber: number) => {
        setCurrentPage(
            Math.min(
                Math.max(pageNumber, 1),
                totalPages
            )
        );
    };

    /* BUSCA */
    const handleBusca = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setBusca(event.target.value);
        setCurrentPage(1);
    };

    /* REMOVER */
    const handleRemoverMovimentacao = async (
        id_movimentacao: number
    ) => {
        const confirmar = window.confirm(
            "Você realmente deseja remover esta movimentação?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await MovimentacaoRequests.removerMovimentacao(
                id_movimentacao
            );

            alert(
                "Movimentação removida com sucesso."
            );

            setMovimentacoes(
                (movimentacoesAtuais) =>
                    movimentacoesAtuais.filter(
                        (movimentacao) =>
                            movimentacao.id_movimentacao !==
                            id_movimentacao
                    )
            );
        } catch (error) {
            console.error(
                "Erro ao remover movimentação:",
                error
            );

            const mensagem =
                error instanceof Error
                    ? error.message
                    : "Erro ao remover movimentação.";

            alert(mensagem);
        }
    };

    /* VALORES MONETÁRIOS */
    const formatarValor = (valor: number | string | null | undefined) => {
        const numero = Number(valor);

        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number.isFinite(numero) ? numero : 0);
    };

    /* DATA */
    const formatarData = (data: string) => {
        const dataConvertida = new Date(data);

        if (Number.isNaN(dataConvertida.getTime())) {
            return "—";
        }

        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(dataConvertida);
    };

    /* TIPO */
    const isEntrada = (movimentacao: MovimentacaoDTO) => {
        const tipo = movimentacao.tipo_movimentacao?.toUpperCase() ?? "";

        return tipo === "ENTRADA" || tipo === "RECEBIMENTO";
    };

    return (
        <main className="flex-1 bg-pink-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-[1500px]">

                {/* CABEÇALHO */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <div className="mb-1 flex items-center gap-2">

                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                                <i className="pi pi-arrow-right-arrow-left" />
                            </span>

                            <h1 className="text-2xl font-bold tracking-tight text-purple-800 sm:text-3xl">
                                Movimentações
                            </h1>

                        </div>

                        <p className="text-sm text-gray-600">
                            Acompanhe as movimentações de estoque do sistema.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/cadastro/movimentacao"
                            )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-500 hover:shadow-md active:scale-[0.98]"
                    >
                        <span className="text-lg leading-none">
                            +
                        </span>

                        Nova Movimentação
                    </button>

                </div>

                {/* BUSCA */}
                <div className="mb-5 rounded-xl border border-pink-200 bg-white p-4 shadow-sm">

                    <div className="relative">

                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pink-500">
                            <i className="pi pi-search" />
                        </span>

                        <input
                            type="text"
                            name="buscar-movimentacao"
                            id="buscar-movimentacao"
                            value={busca}
                            onChange={handleBusca}
                            placeholder="Buscar por produto, tipo, motivo ou observação..."
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                        />

                        {busca && (
                            <button
                                type="button"
                                onClick={() => {
                                    setBusca("");
                                    setCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-gray-600 transition hover:bg-pink-100 hover:text-pink-600"
                            >
                                <i className="pi pi-times" />
                            </button>
                        )}

                    </div>

                </div>

                {/* TABELA */}
                <div className="overflow-hidden rounded-xl border border-pink-200 bg-white shadow-sm">

                    {/* CABEÇALHO DO CARD */}
                    <div className="flex flex-col gap-2 border-b border-pink-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h2 className="font-semibold text-purple-800">
                                Lista de movimentações
                            </h2>

                            <p className="text-xs text-gray-500">
                                {movimentacoesFiltradas.length}{" "}
                                {movimentacoesFiltradas.length === 1
                                    ? "movimentação encontrada"
                                    : "movimentações encontradas"}
                            </p>
                        </div>

                        {busca && (
                            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                                Busca: "{busca}"
                            </span>
                        )}

                    </div>

                    {/* TABELA */}
                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1000px] text-left text-sm">

                            <thead className="bg-purple-800 text-xs uppercase tracking-wide text-white">

                                <tr>

                                    <th className="px-5 py-4">
                                        ID
                                    </th>

                                    <th className="px-5 py-4">
                                        Produto
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Tipo
                                    </th>

                                    <th className="px-5 py-4">
                                        Motivo
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Qtd.
                                    </th>

                                    <th className="px-5 py-4">
                                        Preço Unit.
                                    </th>

                                    <th className="px-5 py-4">
                                        Valor Total
                                    </th>

                                    <th className="px-5 py-4">
                                        Data
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Ações
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-200">

                                {carregando ? (

                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-5 py-14 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-3 text-gray-500">

                                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />

                                                <span className="text-sm">
                                                    Carregando movimentações...
                                                </span>

                                            </div>
                                        </td>
                                    </tr>

                                ) : currentMovimentacoes.length > 0 ? (

                                    currentMovimentacoes.map(
                                        (movimentacao) => (

                                            <tr
                                                key={
                                                    movimentacao.id_movimentacao
                                                }
                                                className="group transition-colors hover:bg-pink-50"
                                            >

                                                {/* ID */}
                                                <td className="px-5 py-4 font-medium text-gray-400">
                                                    #
                                                    {
                                                        movimentacao.id_movimentacao
                                                    }
                                                </td>

                                                {/* PRODUTO */}
                                                <td className="px-5 py-4">

                                                    <span className="rounded-md bg-purple-100 px-2.5 py-1 font-mono text-xs font-medium text-purple-700">
                                                        #
                                                        {
                                                            movimentacao.id_produto
                                                        }
                                                    </span>

                                                </td>

                                                {/* TIPO */}
                                                <td className="px-5 py-4 text-center">

                                                    <span
                                                        className={`inline-flex min-w-20 justify-center rounded-full px-2.5 py-1 text-xs font-bold ${isEntrada(
                                                            movimentacao
                                                        )
                                                                ? "bg-emerald-950 text-emerald-400"
                                                                : "bg-red-950 text-red-400"
                                                            }`}
                                                    >
                                                        {
                                                            movimentacao.tipo_movimentacao
                                                        }
                                                    </span>

                                                </td>

                                                {/* MOTIVO */}
                                                <td className="max-w-[160px] px-5 py-4">

                                                    <p className="truncate text-gray-700">
                                                        {
                                                            movimentacao.motivo ?? "—"
                                                        }
                                                    </p>

                                                </td>

                                                {/* QUANTIDADE */}
                                                <td className="px-5 py-4 text-center font-semibold text-gray-800">
                                                    {
                                                        movimentacao.quantidade
                                                    }
                                                </td>

                                                {/* PREÇO UNITÁRIO */}
                                                <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                                                    {formatarValor(
                                                        movimentacao.preco_unitario
                                                    )}
                                                </td>

                                                {/* VALOR TOTAL */}
                                                <td className="whitespace-nowrap px-5 py-4 font-semibold text-gray-800">
                                                    {formatarValor(
                                                        movimentacao.valor_total
                                                    )}
                                                </td>

                                                {/* DATA */}
                                                <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                                                    {formatarData(
                                                        movimentacao.data_movimentacao
                                                    )}
                                                </td>

                                                {/* AÇÕES */}
                                                <td className="px-5 py-4">

                                                    <div className="flex items-center justify-center gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/detalhes/movimentacao/${movimentacao.id_movimentacao}`
                                                                )
                                                            }
                                                            className="rounded-lg bg-purple-100 px-3 py-2 text-xs font-semibold text-purple-700 transition hover:bg-purple-600 hover:text-white"
                                                        >
                                                            Detalhes
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/atualizar/movimentacao/${movimentacao.id_movimentacao}`
                                                                )
                                                            }
                                                            className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-500 hover:text-white"
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoverMovimentacao(
                                                                    movimentacao.id_movimentacao
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-500 hover:text-white"
                                                        >
                                                            Excluir
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={9}
                                            className="px-5 py-16 text-center"
                                        >

                                            <div className="flex flex-col items-center">

                                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-xl text-purple-700">
                                                    <i className="pi pi-arrow-right-arrow-left" />
                                                </div>

                                                <h3 className="font-semibold text-purple-800">
                                                    Nenhuma movimentação encontrada
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Tente pesquisar por outro produto,
                                                    tipo, motivo ou observação.
                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* PAGINAÇÃO */}
                    <div className="flex flex-col gap-4 border-t border-pink-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-sm text-gray-600">

                            Mostrando{" "}

                            <span className="font-semibold text-purple-800">
                                {movimentacoesFiltradas.length > 0
                                    ? indexOfFirstRow + 1
                                    : 0}
                            </span>{" "}

                            até{" "}

                            <span className="font-semibold text-purple-800">
                                {Math.min(
                                    indexOfLastRow,
                                    movimentacoesFiltradas.length
                                )}
                            </span>{" "}

                            de{" "}

                            <span className="font-semibold text-purple-800">
                                {movimentacoesFiltradas.length}
                            </span>{" "}

                            resultados

                        </p>

                        <div className="flex items-center gap-1">

                            <button
                                type="button"
                                onClick={() =>
                                    paginate(
                                        currentPage - 1
                                    )
                                }
                                disabled={currentPage === 1}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-purple-700 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <i className="pi pi-chevron-left" />
                            </button>

                            {Array.from(
                                {
                                    length: totalPages,
                                },
                                (_, index) =>
                                    index + 1
                            ).map((page) => (

                                <button
                                    type="button"
                                    key={page}
                                    onClick={() =>
                                        paginate(page)
                                    }
                                    className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${currentPage === page
                                            ? "bg-pink-600 text-white shadow-sm"
                                            : "border border-gray-300 bg-white text-purple-700 hover:bg-pink-50"
                                        }`}
                                >
                                    {page}
                                </button>

                            ))}

                            <button
                                type="button"
                                onClick={() =>
                                    paginate(
                                        currentPage + 1
                                    )
                                }
                                disabled={
                                    currentPage ===
                                    totalPages
                                }
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-purple-700 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <i className="pi pi-chevron-right" />
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default ListagemMovimentacoes;