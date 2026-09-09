import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriaRequests from "../../fetch/CategoriaRequest";
import type CategoriaDTO from "../../dto/CategoriaDTO";

function DetalhesCategoria(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [categoria, setCategoria] =
        useState<CategoriaDTO | null>(null);

    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarCategoria() {
            if (!id) {
                setCarregando(false);
                return;
            }

            const dados =
                await CategoriaRequests.obterCategoriaPorId(
                    Number(id)
                );

            if (dados) {
                setCategoria(dados);
            }

            setCarregando(false);
        }

        buscarCategoria();
    }, [id]);

    if (carregando) {
        return (
            <main className="flex min-h-screen flex-1 items-center justify-center bg-pink-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600"></div>

                    <p className="text-lg font-medium text-pink-700">
                        Carregando categoria...
                    </p>
                </div>
            </main>
        );
    }

    if (!categoria) {
        return (
            <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-4 bg-pink-50">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-200 text-xl text-pink-700">
                    <i className="pi pi-tags"></i>
                </div>

                <p className="text-lg font-semibold text-pink-800">
                    Categoria não encontrada.
                </p>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/lista/categorias")
                    }
                    className="rounded-lg bg-pink-500 px-5 py-2 font-medium text-white transition hover:bg-pink-700"
                >
                    Voltar
                </button>

            </main>
        );
    }

    return (
        <main className="min-h-screen flex-1 bg-pink-50 px-4 py-8 sm:px-6">
            <div className="mx-auto w-full max-w-3xl">

                {/* TÍTULO */}
                <div className="mb-6">

                    <div className="mb-1 flex items-center gap-2">

                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-200 text-pink-700">
                            <i className="pi pi-tags"></i>
                        </span>

                        <h1 className="text-3xl font-bold tracking-tight text-pink-700">
                            Detalhes da Categoria
                        </h1>

                    </div>

                    <p className="mt-1 text-pink-600">
                        Visualize as informações da categoria.
                    </p>

                </div>

                {/* CARD */}
                <div className="rounded-xl border border-pink-300 bg-white p-6 shadow-sm">

                    {/* INFORMAÇÕES */}
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* ID */}
                        <div className="rounded-lg border border-pink-200 bg-pink-50 p-4">

                            <p className="text-sm font-medium text-pink-600">
                                ID
                            </p>

                            <p className="mt-2 text-lg font-semibold text-pink-900">
                                {categoria.id_categoria}
                            </p>

                        </div>

                        {/* NOME */}
                        <div className="rounded-lg border border-pink-200 bg-pink-50 p-4">

                            <p className="text-sm font-medium text-pink-600">
                                Nome
                            </p>

                            <p className="mt-2 text-lg font-semibold text-pink-900">
                                {categoria.nome}
                            </p>

                        </div>

                    </div>

                    {/* BOTÃO */}
                    <div className="mt-8 flex gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/lista/categorias"
                                )
                            }
                            className="rounded-lg bg-pink-500 px-5 py-2 font-medium text-white transition hover:bg-pink-700"
                        >
                            Voltar
                        </button>

                    </div>

                </div>

            </div>
        </main>
    );
}

export default DetalhesCategoria;