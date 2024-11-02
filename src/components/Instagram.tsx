export const Instagram = () => {
    // プロフィールページURL
    const profileUrl = "https://www.instagram.com/yourprofile/";

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">Instagram</h2>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-8 md:grid-cols-2 md:gap-6 xl:gap-8">
                    {/* Instagram Reel 1 */}
                    <div
                        className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg cursor-pointer"
                        onClick={() => window.open(profileUrl, "_blank")}
                    >
                        <iframe
                            src="https://www.instagram.com/reel/DASJyGlS33D/embed"
                            className="absolute inset-0 h-full w-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Instagram Reel 2 */}
                    <div
                        className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg cursor-pointer"
                        onClick={() => window.open(profileUrl, "_blank")}
                    >
                        <iframe
                            src="https://www.instagram.com/reel/DASJyGlS33D/embed"
                            className="absolute inset-0 h-full w-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Instagram Reel 3 */}
                    <div
                        className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg cursor-pointer"
                        onClick={() => window.open(profileUrl, "_blank")}
                    >
                        <iframe
                            src="https://www.instagram.com/reel/DASJyGlS33D/embed"
                            className="absolute inset-0 h-full w-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Instagram Reel 4 */}
                    <div
                        className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg cursor-pointer"
                        onClick={() => window.open(profileUrl, "_blank")}
                    >
                        <iframe
                            src="https://www.instagram.com/reel/DASJyGlS33D/embed"
                            className="absolute inset-0 h-full w-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};