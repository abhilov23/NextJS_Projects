export default function  UserProfilePage({params}: any){
    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr/> 
        <p className="text-4xl">Profile page 
            <span className="p-2 rounded bg-rose-400 ml-2 text-black font-bold">{params.id}</span>
        </p>
    </div>
    );
}