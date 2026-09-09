
import { useEffect, useState, type JSX, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriaRequests from "../../fetch/CategoriaRequest";
import type CategoriaDTO from "../../dto/CategoriaDTO";

function AtualizarCategoria(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<CategoriaDTO>({
        id_categoria: 0,
        nome: "",
    });

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        async function buscarCategoria() {
            if (!id) return;

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

    function alterarCampo(
        evento: ChangeEvent<HTMLInputElement>
    ) {
        setCategoria({
            ...categoria,
            [evento.target.name]: evento.target.value,
        });
    }

    async function salvar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (!id) return;

        setSalvando(true);

        const sucesso = await CategoriaRequests.atualizarCategoria(
            Number(id),
            categoria
        );

        setSalvando(false);

        if (sucesso) {
            alert("Categoria atualizada com sucesso!");
            navigate("/lista/categorias");
        } else {
            alert("Não foi possível atualizar a categoria.");
        }
    }

    if (carregando) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-lg text-slate-600">
                    Carregando categoria...
                </p>
            </main>
        );
    }

    return (
        <main className="flex-1 px-6 py-8">
            <div className="mx-auto max-w-2xl">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Atualizar Categoria
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Altere os dados da categoria.
                    </p>
                </div>

                <form
                    onSubmit={salvar}
                    className="rounded-xl bg-white p-6 shadow-md"
                >

                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-slate-600">
                            ID
                        </label>

                        <input
                            type="text"
                            value={categoria.id_categoria}
                            disabled
                            className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-slate-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-slate-600">
                            Nome
                        </label>

                        <input
                            type="text"
                            name="nome"
                            value={categoria.nome}
                            onChange={alterarCampo}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/lista/categorias")
                            }
                            className="rounded-lg bg-slate-200 px-5 py-2 font-medium text-slate-700 hover:bg-slate-300"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={salvando}
                            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {salvando ? "Salvando..." : "Salvar"}
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
}

export default AtualizarCategoria;
