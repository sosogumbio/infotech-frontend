import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriaRequests from "../../fetch/CategoriaRequest";
import type CategoriaDTO from "../../dto/CategoriaDTO";

function DetalhesCategoria(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<CategoriaDTO | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarCategoria() {
            if (!id) {
                setCarregando(false);
                return;
            }

            const dados = await CategoriaRequests.obterCategoriaPorId(
                Number(id)
            );

            if (dados) {
                setCategoria(dados);
            }

            setCarregando(false);
        }

        buscarCategoria();
    }, [id]);

    // Tela de carregamento
    if (carregando) {
        return (
            <main className="flex min-h-screen flex-1 items-center justify-center bg-black">
                <p className="text-lg text-teal-300">
                    Carregando categoria...
                </p>
            </main>
        );
    }

    // Categoria não encontrada
    if (!categoria) {
        return (
            <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-4 bg-black">
                <p className="text-lg text-red-400">
                    Categoria não encontrada.
                </p>

                <button
                    onClick={() => navigate("/lista/categorias")}
                    className="rounded-lg bg-teal-400 px-5 py-2 font-medium text-black transition hover:bg-teal-300"
                >
                    Voltar
                </button>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex-1 bg-black px-6 py-8">
            <div className="mx-auto max-w-3xl">

                {/* Título da página */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-teal-300">
                        Detalhes da Categoria
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Visualize as informações da categoria.
                    </p>
                </div>

                {/* Card principal */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">

                    {/* Informações */}
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* ID */}
                        <div className="rounded-lg bg-zinc-800 p-4">
                            <p className="text-sm font-medium text-gray-400">
                                ID
                            </p>

                            <p className="mt-2 text-lg font-semibold text-white">
                                {categoria.id_categoria}
                            </p>
                        </div>

                        {/* Nome */}
                        <div className="rounded-lg bg-zinc-800 p-4">
                            <p className="text-sm font-medium text-gray-400">
                                Nome
                            </p>

                            <p className="mt-2 text-lg font-semibold text-white">
                                {categoria.nome}
                            </p>
                        </div>

                    </div>

                    {/* Botão */}
                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={() =>
                                navigate("/lista/categorias")
                            }
                            className="rounded-lg bg-teal-400 px-5 py-2 font-medium text-black transition hover:bg-teal-300"
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
