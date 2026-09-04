import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProdutoRequests from "../../fetch/ProdutoRequest";
import type ProdutoDTO from "../../dto/ProdutoDTO";

function DetalhesProduto(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [produto, setProduto] =
        useState<ProdutoDTO | null>(null);

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarProduto() {
            if (!id) {
                setCarregando(false);
                return;
            }

            const idProduto = Number(id);

            if (
                !Number.isInteger(idProduto) ||
                idProduto <= 0
            ) {
                setCarregando(false);
                return;
            }

            try {
                const dados =
                    await ProdutoRequests.obterProdutoPorId(
                        idProduto
                    );

                if (dados) {
                    setProduto(dados);
                }
            } catch (error) {
                console.error(
                    "Erro ao buscar produto:",
                    error
                );
            } finally {
                setCarregando(false);
            }
        }

        buscarProduto();
    }, [id]);

    if (carregando) {
        return (
            <main className="flex flex-1 items-center justify-center bg-black">
                <p className="text-lg text-teal-400">
                    Carregando produto...
                </p>
            </main>
        );
    }

    if (!produto) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-black">
                <p className="text-lg text-red-400">
                    Produto não encontrado.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/lista/produtos")
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
                            <i className="pi pi-box" />
                        </span>

                        <h1 className="text-3xl font-bold text-teal-400">
                            Detalhes do Produto
                        </h1>
                    </div>

                    <p className="mt-1 text-slate-400">
                        Visualize as informações do produto.
                    </p>
                </div>

                {/* CARD */}
                <div className="rounded-xl border border-teal-900 bg-zinc-950 p-6 shadow-md">

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* ID */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                ID do Produto
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-200">
                                #{produto.id_produto}
                            </p>
                        </div>

                        {/* NOME */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Nome
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-200">
                                {produto.nome}
                            </p>
                        </div>

                        {/* CATEGORIA */}
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                ID da Categoria
                            </p>

                            <p className="mt-1 text-lg font-semibold text-slate-200">
                                #{produto.id_categoria}
                            </p>
                        </div>

                    </div>

                    {/* DESCRIÇÃO */}
                    <div className="mt-6 border-t border-zinc-800 pt-6">
                        <p className="text-sm font-medium text-slate-500">
                            Descrição
                        </p>

                        <p className="mt-2 rounded-lg border border-zinc-800 bg-black p-4 text-slate-300">
                            {produto.descricao ||
                                "Nenhuma descrição informada."}
                        </p>
                    </div>

                    {/* BOTÕES */}
                    <div className="mt-8 flex gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/lista/produtos"
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

export default DetalhesProduto;