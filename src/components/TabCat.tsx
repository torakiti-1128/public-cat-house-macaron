export const TabCat = () => {
    return(
        <ul className="grid grid-flow-col text-center text-gray-500 mt-10 ml-10 mr-10">
            <li>
                <a href="#page1" className="flex justify-center border-t-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">子猫一覧</a>
            </li>
            <li>
                <a href="#page1" className="flex justify-center border-t-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">過去の子猫</a>
            </li>
            <li>
                <a href="#page3" className="flex justify-center border-t-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">里親募集中</a>
            </li>
        </ul>
    );
}