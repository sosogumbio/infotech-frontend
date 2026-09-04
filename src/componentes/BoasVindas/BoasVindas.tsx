import type { JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="flex flex-1 items-center justify-center bg-[#fff0f8] px-6 py-20">
            <section className="max-w-5xl text-center">
                <h1 className="mb-6 text-5xl font-bold text-[#8f216d] sm:text-6xl">
                    InfoTech
                </h1>

                <p className="text-lg leading-relaxed text-[#7a3d68] sm:text-xl">
                    Seja bem-vindo à InfoTech, a sua loja de produtos de
                    tecnologia! Explore nossa ampla variedade de produtos,
                    desde os mais recentes gadgets até acessórios essenciais
                    para o seu dia a dia. Aproveite nossas ofertas exclusivas
                    e descubra as últimas tendências em tecnologia. Estamos
                    aqui para proporcionar a melhor experiência de compra para
                    você!
                </p>
            </section>
        </main>
    );
}

export default BoasVindas;