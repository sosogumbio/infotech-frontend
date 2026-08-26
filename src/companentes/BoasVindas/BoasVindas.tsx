import { type JSX } from "react";
function BoasVindas(): JSX.Element {
    return (
        <main className="flex-1 bg-gray-200 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                InfoTech
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                Bem-vindo à InfoTech. Nossa plataforma oferece gerenciamento
                completo de produtos, estoque e movimentações, garantindo uma
                administração rápida, organizada e segura para o seu negócio.
            </p>
        </main>
    );
}
export default BoasVindas;