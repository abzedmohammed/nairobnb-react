import { Link } from "react-router-dom";

export default function ErrorPage(){
    return (
        <>
            <div className="mt-5">
                <h1>404! This Page is not currently available</h1>
                <Link className="btn btn-info btn-sm" to="/">  Back to the homepage</Link>
            </div>
        </>
    )
}