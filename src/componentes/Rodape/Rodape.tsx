import type { JSX } from "react";

function Rodape(): JSX.Element {
    return (
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#b51b78] bg-[#c2187a] px-6 py-5 text-white md:flex-row">
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white sm:text-base">
                    InfoTech
                </span>

                <span className="text-xs text-white/80 sm:text-sm">
                    © {new Date().getFullYear()} — Todos os direitos reservados
                </span>
            </div>

            <p className="text-xs text-white/90 sm:text-sm">
                Desenvolvido por Sophia Gumbio
            </p>
        </footer>
    );
}

export default Rodape;