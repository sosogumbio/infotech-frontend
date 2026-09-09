
import {
    useEffect,
    useState,
    type JSX,
    type ChangeEvent,
    type FormEvent,
} from "react";

import { useNavigate, useParams } from "react-router-dom";

import ProdutoRequests from "../../fetch/ProdutoRequest";
import type ProdutoDTO from "../../dto/ProdutoDTO";

function AtualizarProduto(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [produto, setProduto] = useState<ProdutoDTO | null>(null);

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        async function buscarProduto() {
            if (!id) return;

            const dados =
                await ProdutoRequests.obterProdutoPorId(
                    Number(id)
                );

            if (dados) {
                setProduto(dados);
            }

            setCarregando(false);
        }

        buscarProduto();
    }, [id]);

    function alterarCampo(
        evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if (!produto) return;

        setProduto({
            ...produto,
            [evento.target.name]: evento.target.value,
        });
    }

    async function salvar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        if (!id || !produto) return;

        setSalvando(true);

        const sucesso =
            await ProdutoRequests.atualizarProduto(
                Number(id),
                {
                    ...produto,
                    preco_unitario: Number(produto.preco_unitario),
                }
            );

        setSalvando(false);

        if (sucesso) {
            alert("Produto atualizado com sucesso!");
            navigate("/lista/produtos");
        } else {
            alert("Não foi possível atualizar o produto.");
        }
    }

    if (carregando) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-lg text-slate-600">
                    Carregando produto...
                </p>
            </main>
        );
    }

    if (!produto) {
        return (
            <main className="flex flex-1 items-center justify-center">
                <p className="text-lg text-red-600">
                    Produto não encontrado.
                </p>
            </main>
        );
    }

    return (
        <main className="flex-1 px-6 py-8">
            <div className="mx-auto max-w-3xl">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Atualizar Produto
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Altere os dados do produto.
                    </p>
                </div>

                <form
                    onSubmit={salvar}
                    className="rounded-xl bg-white p-6 shadow-md"
                >

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                ID
                            </label>

                            <input
                                type="text"
                                value={produto.id_produto}
                                disabled
                                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-slate-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Código
                            </label>

                            <input
                                type="text"
                                name="codigo"
                                value={produto.codigo}
                                onChange={alterarCampo}
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Nome
                            </label>

                            <input
                                type="text"
                                name="nome"
                                value={produto.nome}
                                onChange={alterarCampo}
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Descrição
                            </label>

                            <textarea
                                name="descricao"
                                value={produto.descricao || ""}
                                onChange={alterarCampo}
                                rows={4}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-600">
                                Preço
                            </label>

                            <input
                                type="number"
                                name="preco_unitario"
                                value={produto.preco_unitario}
                                onChange={alterarCampo}
                                required
                                min="0"
                                step="0.01"
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                    </div>

                    <div className="mt-8 flex gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/lista/produtos")
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
                            {salvando
                                ? "Salvando..."
                                : "Salvar"}
                        </button>

                    </div>

                </form>
            </div>
        </main>
    );
}

export default AtualizarProduto;