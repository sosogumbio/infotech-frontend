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
            <main className="flex flex-1 items-center justify-center bg-pink-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-100 border-t-pink-600"></div>

                    <p className="text-lg font-medium text-pink-700">
                        Carregando produto...
                    </p>
                </div>
            </main>
        );
    }

    if (!produto) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-pink-50">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-xl text-pink-600">
                    <i className="pi pi-box"></i>
                </div>

                <p className="text-lg font-semibold text-pink-800">
                    Produto não encontrado.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/lista/produtos")
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
                            <i className="pi pi-box"></i>
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight text-pink-800">
                            Detalhes do Produto
                        </h1>

                    </div>

                    <p className="mt-1 text-pink-600">
                        Visualize as informações do produto.
                    </p>

                </div>

                {/* CARD */}
                <div className="rounded-xl border border-pink-200 bg-white p-6 shadow-sm">

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* ID */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                ID do Produto
                            </p>

                            <p className="mt-1 text-lg font-semibold text-pink-900">
                                #{produto.id_produto}
                            </p>
                        </div>

                        {/* NOME */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                Nome
                            </p>

                            <p className="mt-1 text-lg font-semibold text-pink-900">
                                {produto.nome}
                            </p>
                        </div>

                        {/* CATEGORIA */}
                        <div>
                            <p className="text-sm font-medium text-pink-500">
                                ID da Categoria
                            </p>

                            <p className="mt-1 text-lg font-semibold text-pink-900">
                                #{produto.id_categoria}
                            </p>
                        </div>

                    </div>

                    {/* DESCRIÇÃO */}
                    <div className="mt-6 border-t border-pink-100 pt-6">

                        <p className="text-sm font-medium text-pink-500">
                            Descrição
                        </p>

                        <p className="mt-2 rounded-lg border border-pink-200 bg-pink-50 p-4 text-pink-900">
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

export default DetalhesProduto;