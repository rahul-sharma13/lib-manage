const Borrow = ({ setOpenDialog, setAllowed }) => {
    const handleConfirm = () => {
        // Set allowed to true when the user confirms
        setAllowed(true);
        setOpenDialog(false); // Close the dialog
    };

    const handleCancel = () => {
        // Close the dialog without setting allowed
        setOpenDialog(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-center">Confirm Borrow</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Are you sure you want to borrow this book? Once borrowed, it will be marked as unavailable.
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Borrow