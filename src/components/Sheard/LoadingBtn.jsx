

export default function LoadingBtn() {
    return (
        <div className="flex items-center justify-center">
            <button type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium leading-6 text-green-400 transition duration-150 ease-in-out border border-green-400 rounded-md shadow cursor-not-allowed"
                disabled="">
                <svg className="w-5 h-5 mr-3 -ml-1 text-green-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                Loading...
            </button>
        </div>
    )
}
