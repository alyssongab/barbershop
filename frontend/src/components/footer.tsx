const Footer = () => {
    return(
        <footer className="bg-[#E4E4E4] flex justify-between p-1">
            <div className="flex gap-5 items-center">
                <img src="/logo.png" alt="" className="w-[15%]"/>
                <p className="text-slate-700">Sistema <span className="font-bold">v.1.0</span></p>
            </div>
            <div className="flex gap-1">
                <p className="text-slate-700">powered by</p> <span className="font-bold">RMA</span>
            </div>
        </footer>
    )
}

export default Footer; 