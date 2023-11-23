import { NavBar, Footer, Banner, Table } from "../components";


const JuegoUno = () => {
    return (
        <div className="bg-gray-900">
            <NavBar />
            <Banner title="JUEGO N.º 1" description="El juego se trata de..." />
            <Table />
            <Footer />
        </div>
    );
}
export default JuegoUno;