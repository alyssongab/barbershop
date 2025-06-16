type SubheaderProps = {
  titulo: string;
};

const Subheader = ({titulo}: SubheaderProps) => {
    return(
        <div className="border-b-2 pb-2 mb-4 px-6">
            <h1 className="text-xl text-[#242424] opacity-70">{titulo}</h1>
        </div>
    );
}

export default Subheader;