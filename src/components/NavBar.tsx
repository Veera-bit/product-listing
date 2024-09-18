import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

export default function NavBar() {
    return (
        <header className='absolute top-0 left-0 bg-black text-white w-full flex justify-between p-6 px-8 shadow-md'>
            <h1 className="text-3xl font-bold">Product Listing</h1>
            <SignedOut>
                <SignInButton/>
            </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn>
        </header>
    );
}
