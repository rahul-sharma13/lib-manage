import Books from "../models/books.js"

const addBook=async(req,res)=>{
    try {
        const newBook = new Books(req.body);
        const savedBook= await newBook.save();
        res.json(savedBook);
        
    } catch (error) {
        req.status(500).json({error: error.message});
    }
}

const updateBook = async(req,res) =>{
    try {
        const {bookId}=req.params;
        // const {name,description}=req.body;
        const updatedBook=await Books.findByIdAndUpdate(bookId,req.body,{new:true});

        if(!updatedBook) {
            return res.status(404).json({message:`Book not found`})
        }

        res.json(updatedBook);

    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const deleteBook=async(req,res)=>{
    try {
        
        const {bookId}=req.params;
        const deleteBook=await Books.findByIdAndDelete(bookId);

        if(!deleteBook){
            return res.stats(404).json({message:`Book not found`});
        }

        res.json({message:`Book deleted successfully`});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

const allBooks=async(req,res)=>{
    try {
        const allBooks = await Books.find({});
        res.json(allBooks);
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const specificBook=async(req,res)=>{
    try {
        const {bookId}=req.params;
        const specificBook = await Books.findById(bookId);
        if(!specificBook){
            return res.status(404).json({message:`Book not found`});
        }
        res.json(specificBook);
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export{addBook,
     updateBook,
     deleteBook,
     allBooks,
     specificBook
    };