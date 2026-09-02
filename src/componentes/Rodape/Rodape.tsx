import type { JSX } from "react";

function Rodape(): JSX.Element {
    return (
        <footer className="bg-[#0a0f0e] border-t border-[#1c2b29] flex flex-col md:flex-row items-center justify-between gap-3 px-6 py-5">
            <div className="flex items-center gap-2">
                <span className="text-[#2dd4bf] font-bold text-sm sm:text-base">
                    InfoTech
                </span>
                <span className="text-slate-500 text-xs sm:text-sm">
                    © {new Date().getFullYear()} — Todos os direitos reservados
                </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm">
                Desenvolvido por Tauane Souza
            </p>
        </footer>
    );
}

export default Rodape;