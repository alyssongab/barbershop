import Layout from "@/components/Layout";

const HomeCliente = () => {
    return(
        <Layout>
        {/* This is the "picture" for this page's "frame" */}
        <h1 className="text-2xl font-bold">Bem-vindo à sua área!</h1>
        <p>Este é o conteúdo principal da sua página de cliente.</p>
        </Layout>
    );
}

export default HomeCliente;