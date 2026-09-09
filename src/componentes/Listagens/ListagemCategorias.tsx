import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type CategoriaDTO from "../../dto/CategoriaDTO";
import CategoriaRequests from "../../fetch/CategoriaRequest";

function ListagemCategorias() {
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
    const [busca, setBusca] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [carregando, setCarregando] = useState(true);

    const rowsPerPage = 5;

    function validarCategoria(categoria: CategoriaDTO): boolean {
        if (
            categoria.id_categoria === undefined ||
            categoria.id_categoria === null ||
            typeof categoria.id_categoria !== "number" ||
            !Number.isInteger(categoria.id_categoria) ||
            categoria.id_categoria <= 0
        ) {
            console.error(
                "Categoria inválida: o ID deve ser um número inteiro positivo.",
                categoria
            );

            return false;
        }

        if (
            typeof categoria.nome !== "string" ||
            categoria.nome.trim() === ""
        ) {
            console.error(
                "Categoria inválida: o nome não pode estar vazio.",
                categoria
            );

            return false;
        }

        if (categoria.nome.trim().length > 100) {
            console.error(
                "Categoria inválida: o nome não pode possuir mais de 100 caracteres.",
                categoria
            );

            return false;
        }

        return true;
    }

    useEffect(() => {
        async function buscarCategorias() {
            try {
                setCarregando(true);

                const resposta =
                    await CategoriaRequests.obterListaDeCategorias();

                console.log("Categorias recebidas da API:", resposta);

                if (!Array.isArray(resposta)) {
                    console.error("A API retornou um formato inválido.");
                    setCategorias([]);
                    return;
                }

                const categoriasValidas = resposta.filter((categoria) =>
                    validarCategoria(categoria)
                );

                setCategorias(categoriasValidas);

                if (categoriasValidas.length !== resposta.length) {
                    console.warn(
                        "Algumas categorias foram ignoradas porque possuem dados inválidos."
                    );
                }
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);

                setCategorias([]);

                alert("Não foi possível carregar as categorias.");
            } finally {
                setCarregando(false);
            }
        }

        buscarCategorias();
    }, []);

    const termoBusca = busca.trim().toLowerCase();

    const categoriasFiltradas = categorias.filter((categoria) => {
        if (!termoBusca) {
            return true;
        }

        const nome = categoria.nome?.toLowerCase() ?? "";
        const id = String(categoria.id_categoria);

        return nome.includes(termoBusca) || id.includes(termoBusca);
    });

    const totalPages = Math.max(
        1,
        Math.ceil(categoriasFiltradas.length / rowsPerPage)
    );

    const indexOfFirstRow = (currentPage - 1) * rowsPerPage;
    const indexOfLastRow = indexOfFirstRow + rowsPerPage;

    const currentCategorias = categoriasFiltradas.slice(
        indexOfFirstRow,
        indexOfLastRow
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    function mudarPagina(page: number) {
        if (page < 1) {
            setCurrentPage(1);
            return;
        }

        if (page > totalPages) {
            setCurrentPage(totalPages);
            return;
        }

        setCurrentPage(page);
    }

    function handleBusca(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const valor = event.target.value;

        if (valor.length > 100) {
            return;
        }

        setBusca(valor);
        setCurrentPage(1);
    }

    async function handleRemoverCategoria(id_categoria: number) {
        if (
            !Number.isInteger(id_categoria) ||
            id_categoria <= 0
        ) {
            alert("ID da categoria inválido.");
            return;
        }

        const confirmar = window.confirm(
            "Você realmente deseja remover esta categoria?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await CategoriaRequests.removerCategoria(id_categoria);

            setCategorias((categoriasAtuais) =>
                categoriasAtuais.filter(
                    (categoria) =>
                        categoria.id_categoria !== id_categoria
                )
            );

            alert("Categoria removida com sucesso.");
        } catch (error) {
            console.error("Erro ao remover categoria:", error);

            const mensagem =
                error instanceof Error
                    ? error.message
                    : "Erro ao remover categoria.";

            alert(mensagem);
        }
    }

    return (
        <main className="min-h-screen flex-1 bg-pink-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1500px]">

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-700">
                                <i className="pi pi-tags"></i>
                            </span>

                            <h1 className="text-2xl font-bold tracking-tight text-pink-800 sm:text-3xl">
                                Categorias
                            </h1>
                        </div>

                        <p className="text-sm text-pink-700">
                            Acompanhe as categorias cadastradas no sistema.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/cadastro/categoria")
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700 hover:shadow-md active:scale-[0.98]"
                    >
                        <span className="text-lg leading-none">
                            +
                        </span>

                        Nova Categoria
                    </button>
                </div>

                <div className="mb-5 rounded-xl border border-pink-200 bg-white p-4 shadow-sm">
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pink-600">
                            <i className="pi pi-search"></i>
                        </span>

                        <input
                            type="text"
                            name="buscar-categoria"
                            id="buscar-categoria"
                            value={busca}
                            onChange={handleBusca}
                            maxLength={100}
                            placeholder="Buscar por nome ou ID da categoria..."
                            className="w-full rounded-lg border border-pink-200 bg-pink-50 py-3 pl-11 pr-10 text-sm text-pink-900 outline-none transition placeholder:text-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                        />

                        {busca.length > 0 && (
                            <button
                                type="button"
                                onClick={() => {
                                    setBusca("");
                                    setCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-pink-400 transition hover:bg-pink-100 hover:text-pink-700"
                            >
                                <i className="pi pi-times"></i>
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-pink-200 bg-white shadow-sm">

                    <div className="flex flex-col gap-2 border-b border-pink-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-semibold text-pink-800">
                                Lista de categorias
                            </h2>

                            <p className="text-xs text-pink-600">
                                {categoriasFiltradas.length}{" "}
                                {categoriasFiltradas.length === 1
                                    ? "categoria encontrada"
                                    : "categorias encontradas"}
                            </p>
                        </div>

                        {busca && (
                            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700">
                                Busca: "{busca}"
                            </span>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-left text-sm">

                            <thead className="bg-pink-700 text-xs uppercase tracking-wide text-white">
                                <tr>
                                    <th className="px-5 py-4">
                                        ID
                                    </th>

                                    <th className="px-5 py-4">
                                        Nome
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Ações
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-pink-100">

                                {carregando && (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-5 py-14 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-3 text-pink-600">
                                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-100 border-t-pink-600"></div>

                                                <span className="text-sm">
                                                    Carregando categorias...
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {!carregando &&
                                    currentCategorias.length > 0 &&
                                    currentCategorias.map(
                                        (categoria) => (
                                            <tr
                                                key={
                                                    categoria.id_categoria
                                                }
                                                className="group transition-colors hover:bg-pink-50"
                                            >
                                                <td className="px-5 py-4 font-medium text-pink-500">
                                                    #
                                                    {
                                                        categoria.id_categoria
                                                    }
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="font-medium text-pink-900">
                                                        {
                                                            categoria.nome
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-center gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/detalhes/categoria/${categoria.id_categoria}`
                                                                )
                                                            }
                                                            className="rounded-lg bg-pink-100 px-3 py-2 text-xs font-semibold text-pink-700 transition hover:bg-pink-600 hover:text-white"
                                                        >
                                                            Detalhes
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/atualizar/categoria/${categoria.id_categoria}`
                                                                )
                                                            }
                                                            className="rounded-lg bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-600 hover:text-white"
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoverCategoria(
                                                                    categoria.id_categoria
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                                                        >
                                                            Excluir
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}

                                {!carregando &&
                                    currentCategorias.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-5 py-16 text-center"
                                            >
                                                <div className="flex flex-col items-center">

                                                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-xl text-pink-600">
                                                        <i className="pi pi-tags"></i>
                                                    </div>

                                                    <h3 className="font-semibold text-pink-800">
                                                        Nenhuma categoria encontrada
                                                    </h3>

                                                    <p className="mt-1 text-sm text-pink-500">
                                                        {busca
                                                            ? "Tente pesquisar por outro nome ou ID."
                                                            : "Ainda não existem categorias cadastradas."}
                                                    </p>

                                                </div>
                                            </td>
                                        </tr>
                                    )}

                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-pink-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-sm text-pink-600">
                            Mostrando{" "}

                            <span className="font-semibold text-pink-800">
                                {categoriasFiltradas.length > 0
                                    ? indexOfFirstRow + 1
                                    : 0}
                            </span>{" "}

                            até{" "}

                            <span className="font-semibold text-pink-800">
                                {Math.min(
                                    indexOfLastRow,
                                    categoriasFiltradas.length
                                )}
                            </span>{" "}

                            de{" "}

                            <span className="font-semibold text-pink-800">
                                {categoriasFiltradas.length}
                            </span>{" "}

                            resultados
                        </p>

                        <div className="flex items-center gap-1">

                            <button
                                type="button"
                                onClick={() =>
                                    mudarPagina(
                                        currentPage - 1
                                    )
                                }
                                disabled={currentPage === 1}
                                className="rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm text-pink-600 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <i className="pi pi-chevron-left"></i>
                            </button>

                            {Array.from(
                                {
                                    length: totalPages,
                                },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    type="button"
                                    key={page}
                                    onClick={() =>
                                        mudarPagina(page)
                                    }
                                    className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                        currentPage === page
                                            ? "bg-pink-600 text-white shadow-sm"
                                            : "border border-pink-200 bg-white text-pink-600 hover:bg-pink-50"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() =>
                                    mudarPagina(
                                        currentPage + 1
                                    )
                                }
                                disabled={
                                    currentPage === totalPages
                                }
                                className="rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm text-pink-600 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <i className="pi pi-chevron-right"></i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ListagemCategorias;