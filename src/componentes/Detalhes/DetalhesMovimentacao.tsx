import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovimentacaoRequests from "../../fetch/MovimentacaoRequest";
import type MovimentacaoDTO from "../../dto/MovimentacaoDTO";

function DetalhesMovimentacao(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [movimentacao, setMovimentacao] =
        useState<MovimentacaoDTO | null>(null);

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarMovimentacao() {
            if (!id) {
                setCarregando(false);
                return;
            }

            const idMovimentacao = Number(id);

            if (
                !Number.isInteger(idMovimentacao) ||
                idMovimentacao <= 0
            ) {
                setCarregando(false);
                return;
            }

            try {
                const dados =
                    await MovimentacaoRequests.obterMovimentacaoPorId(
                        idMovimentacao
                    );

                if (dados) {
                    setMovimentacao(dados);
                }
            } catch (error) {
                console.error(
                    "Erro ao buscar movimentação:",
                    error
                );
            } finally {
                setCarregando(false);
            }
        }

        buscarMovimentacao();
    }, [id]);

    const formatarValor = (
        valor: number | string | null | undefined
    ) => {
        const numero = Number(valor);

        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number.isFinite(numero) ? numero : 0);
    };

    const formatarData = (
        data: string | null | undefined
    ) => {
        if (!data) {
            return "—";
        }

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

    const isEntrada = () => {
        const tipo =
            movimentacao?.tipo_movimentacao
                ?.toUpperCase() ?? "";

        return (
            tipo === "ENTRADA" ||
            tipo === "RECEBIMENTO"
        );
    };

    if (carregando) {
        return (
            <main className="flex flex-1 items-center justify-center bg-pink-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-100 border-t-pink-600"></div>

                    <p className="text-lg font-medium text-pink-700">
                        Carregando movimentação...
                    </p>
                </div>
            </main>
        );
    }

    if (!movimentacao) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-pink-50">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-xl text-pink-600">
                    <i className="pi pi-arrow-right-arrow-left"></i>
                </div>

                <p className="text-lg font-semibold text-pink-800">
                    Movimentação não encontrada.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/lista/movimentacoes"
                        )
                    }
                    className="rounded-lg bg-pink-600 px-5 py-2 font-medium text-white transition hover:bg-pink-700"
                >
                    Voltar
                </button>

            </main>
        );
    }

    return (
        <main className="flex-1 bg-pink-50 px-4 py-8 sm:px-6">
            <div className="mx-auto w-full max-w-4xl">

                {/* CABEÇALHO */}
                <div className="mb-6">

                    <div className="mb-1 flex items-center gap-2">

                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                            <i className="pi pi-arrow-right-arrow-left"></i>
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight text-pink-800">
                            Detalhes da Movimentação
                        </h1>

                    </div>

                    <p className="mt-1 text-pink-600">
                        Visualize as informações da movimentação de estoque.
                    </p>

                </div>

                {/* CARD */}
                <div className="rounded-xl border border-pink-200 bg-white p-6 shadow-sm">

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* ID */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                ID da Movimentação
                            </p>

                            <p className="mt-1 text-lg font-semibold text-pink-900">
                                #{movimentacao.id_movimentacao}
                            </p>
                        </div>

                        {/* ID PRODUTO */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                ID do Produto
                            </p>

                            <p className="mt-1 text-lg font-semibold text-pink-900">
                                #{movimentacao.id_produto}
                            </p>
                        </div>

                        {/* TIPO */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                Tipo de Movimentação
                            </p>

                            <span
                                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                                    isEntrada()
                                        ? "bg-pink-100 text-pink-700"
                                        : "bg-rose-100 text-rose-700"
                                }`}
                            >
                                {movimentacao.tipo_movimentacao}
                            </span>
                        </div>

                        {/* QUANTIDADE */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                Quantidade
                            </p>

                            <p className="mt-1 text-lg font-semibold text-pink-900">
                                {movimentacao.quantidade}
                            </p>
                        </div>

                        {/* PREÇO UNITÁRIO */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                Preço Unitário
                            </p>

                            <p className="mt-1 text-lg font-semibold text-pink-900">
                                {formatarValor(
                                    movimentacao.preco_unitario
                                )}
                            </p>
                        </div>

                        {/* VALOR TOTAL */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                Valor Total
                            </p>

                            <p className="mt-1 text-lg font-bold text-pink-700">
                                {formatarValor(
                                    movimentacao.valor_total
                                )}
                            </p>
                        </div>

                        {/* DATA */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                Data da Movimentação
                            </p>

                            <p className="mt-1 text-lg font-semibold text-pink-900">
                                {formatarData(
                                    movimentacao.data_movimentacao
                                )}
                            </p>
                        </div>

                        {/* MOTIVO */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                Motivo
                            </p>

                            <p className="mt-1 text-lg font-semibold text-pink-900">
                                {movimentacao.motivo || "—"}
                            </p>
                        </div>

                    </div>

                    {/* OBSERVAÇÃO */}
                    <div className="mt-6 border-t border-pink-100 pt-6">

                        <p className="text-sm font-medium text-pink-500">
                            Observação
                        </p>

                        <p className="mt-2 rounded-lg border border-pink-200 bg-pink-50 p-4 text-pink-900">
                            {movimentacao.observacao ||
                                "Nenhuma observação informada."}
                        </p>

                    </div>

                    {/* BOTÕES */}
                    <div className="mt-8 flex gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/lista/movimentacoes"
                                )
                            }
                            className="rounded-lg bg-pink-300 px-5 py-2 font-medium text-pink-900 transition hover:bg-pink-800 hover:text-white"
                        >
                            Voltar
                        </button>

                    </div>

                </div>

            </div>
        </main>
    );
}

export default DetalhesMovimentacao;