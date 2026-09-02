import type { JSX } from "react";
function BoasVindas(): JSX.Element {
    return (
        <main className="flex-1 bg-black flex items-center justify-center px-6 py-20">
            <section className="max-w-4xl text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-400 mb-6">
                    InfoTech
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-teal-300 leading-relaxed">
                    Seja bem-vindo à InfoTech, o lugar certo pra quem gosta de
                    tecnologia de verdade. Trabalhamos com os melhores produtos
                    do mercado, sempre com preço justo e entrega rápida. Nosso
                    time está pronto pra te ajudar a escolher o que combina com
                    você. Explore nosso catálogo e descubra novidades incríveis!
                </p>
            </section>
        </main>
    );
}
export default BoasVindas;