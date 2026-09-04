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
            <main className="flex flex-1 items-center justify-center bg-black">
                <p className="text-lg text-teal-400">
                    Carregando movimentação...
                </p>
            </main>
        );
    }

    if (!movimentacao) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-black">
                <p className="text-lg text-red-400">
                    Movimentação não encontrada.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/lista/movimentacoes")
                    }
                    className="rounded-lg bg-teal-500 px-5 py-2 font-medium text-black transition hover:bg-teal-400"
                >
                    Voltar
                </button>
            </main>
        );
    }

    return (
        <main className="flex-1 bg-black px-6 py-8">
            <div className="mx-auto max-w-4xl">

                {/* CABEÇALHO */}
                <div className="mb-6">
                    <div className="mb-1 flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-950 text-teal-400">
                            <i className="pi pi-arrow-right-arrow-left" />
                        </span>

                        <h1 className="text-3xl font-bold text-teal-400">
                            Detalhes da Movimentação
                        </h1>
                    </div>

                    <p className="mt-1 text-slate-400">
                        Visualize as informações da movimentação de estoque.
                    </p>
                </div>

                {/* CARD */}
                <div className="rounded-xl border border-teal-900 bg-zinc-950 p-6 shadow-md">

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* ID */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                ID da Movimentação
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-200">
                                #{movimentacao.id_movimentacao}
                            </p>
                        </div>

                        {/* ID PRODUTO */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                ID do Produto
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-200">
                                #{movimentacao.id_produto}
                            </p>
                        </div>

                        {/* TIPO */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Tipo de Movimentação
                            </p>

                            <span
                                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                                    isEntrada()
                                        ? "bg-emerald-950 text-emerald-400"
                                        : "bg-red-950 text-red-400"
                                }`}
                            >
                                {movimentacao.tipo_movimentacao}
                            </span>
                        </div>

                        {/* QUANTIDADE */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Quantidade
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-200">
                                {movimentacao.quantidade}
                            </p>
                        </div>

                        {/* PREÇO UNITÁRIO */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Preço Unitário
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-200">
                                {formatarValor(
                                    movimentacao.preco_unitario
                                )}
                            </p>
                        </div>

                        {/* VALOR TOTAL */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Valor Total
                            </p>

                            <p className="mt-1 text-lg font-semibold text-teal-400">
                                {formatarValor(
                                    movimentacao.valor_total
                                )}
                            </p>
                        </div>

                        {/* DATA */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Data da Movimentação
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-200">
                                {formatarData(
                                    movimentacao.data_movimentacao
                                )}
                            </p>
                        </div>

                        {/* MOTIVO */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Motivo
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-200">
                                {movimentacao.motivo || "—"}
                            </p>
                        </div>
                    </div>

                    {/* OBSERVAÇÃO */}
                    <div className="mt-6 border-t border-zinc-800 pt-6">
                        <p className="text-sm font-medium text-slate-500">
                            Observação
                        </p>

                        <p className="mt-2 rounded-lg border border-zinc-800 bg-black p-4 text-slate-300">
                            {movimentacao.observacao || "Nenhuma observação informada."}
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
                            className="rounded-lg bg-zinc-800 px-5 py-2 font-medium text-slate-300 transition hover:bg-zinc-700"
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