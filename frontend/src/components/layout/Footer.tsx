const Footer = () => {
    return(
        <footer className="bg-[#E4E4E4] flex justify-between p-2">
            <div className="flex gap-3 items-center">
                <img src="/logo.png" alt="" className="w-[10%]"/>
                <p className="text-slate-700">BarbeariaSantos <span className="font-bold">v.1.0</span></p>
            </div>
            <div className="flex items-center">
                <p className="text-slate-700">&copy; powered by <span className="font-bold">RMA</span></p>
            </div>
        </footer>
    )
}

export default Footer; 