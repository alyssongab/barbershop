import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";

const HomeCliente = () => {
    return(

        // 1. container principal
        <div className="flex flex-col h-screen">

            {/* header é o primeiro item, e vai ocupar toda a width */}
            <Header />

            {/* 2. novo container para o conteudo abaixo do header */}
            <div className="flex flex-1">
                {/* fica na esquerda, a altura é controlada por esse container */}
                <Sidebar />

                {/* vai ocupar a width restante */}
                <div className="flex-1 flex flex-col">

                    {/* div do conteudo, empurra o footer para baixo */}
                    <main className="flex-grow p-8">
                        <h1 className="text-2xl font-bold">Bem-vindo à área do cliente</h1>
                        <p>conteúdo principal da pagina</p>
                        {/* resto do conteudo vai aqui */}
                    </main>
            
                    {/* footer no rodapé da div do conteudo */}
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default HomeCliente;