import {useState, useEffect, type JSX, type ChangeEvent,} from "react";
import type ProdutoDTO from "../../dto/ProdutoDTO";
import ProdutoRequests from "../../fetch/ProdutoRequest";
import { useNavigate } from "react-router-dom";

function ListagemProdutos(): JSX.Element {
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [busca, setBusca] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [carregando, setCarregando] = useState(true);

    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                setCarregando(true);

                const listaDeProdutos =
                    await ProdutoRequests.obterListaDeProdutos();

                setProdutos(listaDeProdutos);
            } catch (error) {
                console.error(
                    `Erro ao buscar produtos. ${error}`
                );

                alert(
                    "Erro ao carregar a listagem de produtos."
                );
            } finally {
                setCarregando(false);
            }
        };

        buscarProdutos();
    }, []);

    /* FILTRO */
    const produtosFiltrados = produtos.filter((produto) => {
        const termo = busca.toLowerCase().trim();

        if (!termo) {
            return true;
        }

        return (
            produto.nome?.toLowerCase().includes(termo) ||
            produto.codigo?.toLowerCase().includes(termo) ||
            produto.descricao?.toLowerCase().includes(termo)
        );
    });

    /* PAGINAÇÃO */
    const totalPages = Math.max(
        1,
        Math.ceil(
            produtosFiltrados.length / rowsPerPage
        )
    );

    const indexOfLastRow =
        currentPage * rowsPerPage;

    const indexOfFirstRow =
        indexOfLastRow - rowsPerPage;

    const currentProdutos =
        produtosFiltrados.slice(
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
    const handleRemoverProduto = async (
        id_produto: number
    ) => {
        const confirmar = window.confirm(
            "Você realmente deseja remover este produto?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const sucesso =
                await ProdutoRequests.removerProduto(
                    id_produto
                );

            if (sucesso) {
                alert(
                    "Produto removido com sucesso."
                );

                setProdutos(
                    (produtosAtuais) =>
                        produtosAtuais.filter(
                            (produto) =>
                                produto.id_produto !==
                                id_produto
                        )
                );
            } else {
                alert(
                    "Não foi possível remover o produto."
                );
            }
        } catch (error) {
            console.error(
                "Erro ao remover produto:",
                error
            );

            alert("Erro ao remover produto.");
        }
    };

    /* PREÇO */
    const formatarPreco = (preco: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(preco);
    };

    /* ESTOQUE */
    const estoqueBaixo = (produto: ProdutoDTO) => {
        return (
            produto.quantidade_disponivel <=
            produto.quantidade_minima
        );
    };

    const remover = (id_produto: number): void => {
        handleRemoverProduto(id_produto);
    };

    return (
        <main className="flex-1 bg-violet-50 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-[1500px]">

                {/* CABEÇALHO */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <div className="mb-1 flex items-center gap-2">

                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                                <i className="pi pi-box" />
                            </span>

                            <h1 className="text-2xl font-bold tracking-tight text-violet-950 sm:text-3xl">
                                Produtos
                            </h1>

                        </div>

                        <p className="text-sm text-slate-500">
                            Gerencie os produtos cadastrados no sistema.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/cadastro/produto"
                            )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800 hover:shadow-md active:scale-[0.98]"
                    >
                        <span className="text-lg leading-none">
                            +
                        </span>

                        Novo Produto
                    </button>

                </div>

                {/* BUSCA */}
                <div className="mb-5 rounded-xl border border-violet-100 bg-white p-4 shadow-sm">

                    <div className="relative">

                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-violet-400">
                            <i className="pi pi-search" />
                        </span>

                        <input
                            type="text"
                            name="buscar-produto"
                            id="buscar-produto"
                            value={busca}
                            onChange={handleBusca}
                            placeholder="Buscar por nome, código ou descrição..."
                            className="w-full rounded-lg border border-slate-200 bg-violet-50/40 py-3 pl-11 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-200"
                        />

                        {busca && (
                            <button
                                type="button"
                                onClick={() => {
                                    setBusca("");
                                    setCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-slate-400 transition hover:bg-violet-100 hover:text-violet-700"
                            >
                                <i className="pi pi-times" />
                            </button>
                        )}

                    </div>

                </div>

                {/* TABELA */}
                <div className="overflow-hidden rounded-xl border border-violet-100 bg-white shadow-sm">

                    {/* CABEÇALHO DO CARD */}
                    <div className="flex flex-col gap-2 border-b border-violet-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <h2 className="font-semibold text-violet-950">
                                Lista de produtos
                            </h2>

                            <p className="text-xs text-slate-500">
                                {produtosFiltrados.length}{" "}
                                {produtosFiltrados.length === 1
                                    ? "produto encontrado"
                                    : "produtos encontrados"}
                            </p>
                        </div>

                        {busca && (
                            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                                Busca: "{busca}"
                            </span>
                        )}

                    </div>

                    {/* TABELA */}
                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[900px] text-left text-sm">

                            <thead className="bg-violet-950 text-xs uppercase tracking-wide text-violet-100">

                                <tr>

                                    <th className="px-5 py-4">
                                        ID
                                    </th>

                                    <th className="px-5 py-4">
                                        Código
                                    </th>

                                    <th className="px-5 py-4">
                                        Produto
                                    </th>

                                    <th className="px-5 py-4">
                                        Descrição
                                    </th>

                                    <th className="px-5 py-4">
                                        Preço
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Estoque
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Mínima
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Ações
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-violet-100">

                                {carregando ? (

                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-5 py-14 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-3 text-slate-400">

                                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-100 border-t-violet-700" />

                                                <span className="text-sm">
                                                    Carregando produtos...
                                                </span>

                                            </div>
                                        </td>
                                    </tr>

                                ) : currentProdutos.length > 0 ? (

                                    currentProdutos.map(
                                        (produto) => (

                                            <tr
                                                key={
                                                    produto.id_produto
                                                }
                                                className="group transition-colors hover:bg-violet-50/60"
                                            >

                                                {/* ID */}
                                                <td className="px-5 py-4 font-medium text-slate-400">
                                                    #
                                                    {
                                                        produto.id_produto
                                                    }
                                                </td>

                                                {/* CÓDIGO */}
                                                <td className="px-5 py-4">

                                                    <span className="rounded-md bg-violet-100 px-2.5 py-1 font-mono text-xs font-medium text-violet-700">
                                                        {
                                                            produto.codigo
                                                        }
                                                    </span>

                                                </td>

                                                {/* NOME */}
                                                <td className="px-5 py-4">

                                                    <div className="font-semibold text-violet-950">
                                                        {
                                                            produto.nome
                                                        }
                                                    </div>

                                                </td>

                                                {/* DESCRIÇÃO */}
                                                <td className="max-w-xs px-5 py-4">

                                                    <p className="truncate text-slate-500">
                                                        {
                                                            produto.descricao
                                                        }
                                                    </p>

                                                </td>

                                                {/* PREÇO */}
                                                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-700">
                                                    {formatarPreco(
                                                        produto.preco_unitario
                                                    )}
                                                </td>

                                                {/* ESTOQUE */}
                                                <td className="px-5 py-4 text-center">

                                                    <span
                                                        className={`inline-flex min-w-12 justify-center rounded-full px-2.5 py-1 text-xs font-bold ${estoqueBaixo(
                                                            produto
                                                        )
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-emerald-100 text-emerald-700"
                                                            }`}
                                                    >
                                                        {
                                                            produto.quantidade_disponivel
                                                        }
                                                    </span>

                                                </td>

                                                {/* MÍNIMA */}
                                                <td className="px-5 py-4 text-center text-slate-500">
                                                    {
                                                        produto.quantidade_minima
                                                    }
                                                </td>

                                                {/* AÇÕES */}
                                                <td className="px-5 py-4">

                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                navigate(`/detalhes/produto/${produto.id_produto}`)
                                                            }
                                                            className="rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-200"
                                                        >
                                                            Detalhes
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                navigate(`/atualizar/produto/${produto.id_produto}`)
                                                            }
                                                            className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-100"
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            onClick={() => remover(produto.id_produto)}
                                                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
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
                                            colSpan={8}
                                            className="px-5 py-16 text-center"
                                        >

                                            <div className="flex flex-col items-center">

                                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-xl text-violet-600">
                                                    <i className="pi pi-box" />
                                                </div>

                                                <h3 className="font-semibold text-violet-950">
                                                    Nenhum produto encontrado
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-400">
                                                    Tente pesquisar por outro nome,
                                                    código ou descrição.
                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* PAGINAÇÃO */}
                    <div className="flex flex-col gap-4 border-t border-violet-100 bg-violet-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-sm text-slate-500">

                            Mostrando{" "}

                            <span className="font-semibold text-violet-800">
                                {produtosFiltrados.length > 0
                                    ? indexOfFirstRow + 1
                                    : 0}
                            </span>{" "}

                            até{" "}

                            <span className="font-semibold text-violet-800">
                                {Math.min(
                                    indexOfLastRow,
                                    produtosFiltrados.length
                                )}
                            </span>{" "}

                            de{" "}

                            <span className="font-semibold text-violet-800">
                                {produtosFiltrados.length}
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
                                className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40"
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
                                        ? "bg-violet-700 text-white shadow-sm"
                                        : "border border-violet-200 bg-white text-violet-700 hover:bg-violet-100"
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
                                className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40"
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

export default ListagemProdutos;