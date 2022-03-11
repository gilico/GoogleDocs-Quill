const {ObjectId} = require('mongodb');
const Document = require('../models/Document');
const User = require('../models/User');

const setAllDocsWithUsers = async (oneDoc) => {
    try {
        const user = await User.findById(oneDoc.userCreator)
        if(user){
            return {
                _id: oneDoc._id,
                title: oneDoc.title,
                content: oneDoc.content,
                userCreator: user.email,
                lastUpdate: oneDoc.updatedAt//.toLocaleDateString()
            };
        }
        
    } catch (error) {
        return error;
    }
}

const fetchAllUsersDocs = async (thisUser) => {
    try {
        
        let docsArr = [];
    
        for (const docId of thisUser.documents) {
            let oneDoc = await Document.findById(docId);
            docsArr.push(await setAllDocsWithUsers(oneDoc));
        }
        
        return docsArr;
    } 
    catch (error) {
        console.log(error)
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}



const getAllDocs = async (req, res) => {
    try {
        let thisUser = await User.findById(res.locals.user._id);
        
        let docsArr = await fetchAllUsersDocs(thisUser);
        docsArr.sort(function(a, b) {
            var c = new Date(a.lastUpdate);
            var d = new Date(b.lastUpdate);
            return c-d;
        });

        if(docsArr)
        {
            res.json(docsArr);
        }else
        {
            throw Error("You Don't Have Any Documents")
        }

    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};


const createDoc = async (req, res) => {
    const { title,  content, userShared  } = req.body;
    try {
        
        if(!content)
        {
            throw Error("You Must Have Content In Order To Save");
        }
        else 
        {
            
            // create new doc
            const newDoc = new Document({userCreator: res.locals.user._id, title, content});
            const createDoc = await newDoc.save();

            // save it to the original creator
            const creator = await User.findByIdAndUpdate(
                res.locals.user._id,
                {$push: {documents: createDoc._id}}
            )
            
            let notUsers = [];
            
            // insert the new doc the the shared users
            if(userShared && creator){
                for (const oneEmail of userShared) {
                    let user = await User.findOneAndUpdate(
                        {email : oneEmail},
                        {$push: {documents: createDoc._id}}
                    )
                    if(!user){
                        notUsers.push(oneEmail);
                    }else{
                        newDoc.userShared.push(user._id);
                    }
                }
                createDoc = await newDoc.save();
            }

           

            if(notUsers.length > 0){
                res.status(505).send("This users is not Registered: " +notUsers + " (document was not saved)");
            }
            else
            {
                res.status(201).send("Document created Successfully!");
            }
            
        }
    } 
    catch (error) 
    {
        console.log(error)
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const getById = async (req, res) => {
  
    try {
        
        const document = await Document.findById(req.params.id);
        
        if(document)
        {
            res.json(document);
        }
        else
        {
            throw new Error("Document Not Found");
        } 
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const updateDoc = async (req, res) => {

    const { title, content, userShared } = req.body;

    try {
        
        const docToUpdate = await Document.findById(req.params.id);

        // if found a document in the db by it's id then update
        if(docToUpdate)
        {
            if(title){
                docToUpdate.title = title;
            }
            if(content){
                docToUpdate.content = content;
            }

         
            let isAllUsers = true;
            if(userShared){
                for (const oneEmail of userShared) {
                        let user = await User.findOne({email : oneEmail})
                        if(!user){
                            isAllUsers = false;
                            throw new Error("Can't update document");
                        }else{
                            docToUpdate.userShared.push(user._id);
                        }
                }
            }
            if(isAllUsers){
                const updatedDoc = await docToUpdate.save();
                res.json(updatedDoc);
            }
            

        }
        else
        {
            throw Error("Document Not Found");
        }
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const deleteDoc = async (req, res) => {

    try {
        let deleted = await Document.findOneAndDelete({_id: req.params.id});
        
        if(deleted) 
        {                
            res.send("Document Deleted" );
        }
        else
        {
            throw Error("Document not found");
        }
    } 
    catch (error) 
    {
        console.log(error);
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}


const handleErrors = (err) => {
    let errors = { form: '', findDocument: '', findUser: '', access: ''};

    // can't get all codes
    if(err.message === "You Don't Have Any Document")
    {
        errors.findDocument = "You Don't Have Any Document";
    }
    // need to fill all the params
    if(err.message === 'Please Fill the Require Fields')
    {
        errors.form = 'Please Fill the Require Fields';
    }

    if(err.message === "Document Not Found")
    {
        errors.findDocument = "Document Not Found";
    }

    if(err.message === "You Can't access this Document")
    {
        errors.findUser = "You Can't access this Document";
    }
    if(err.message === "Can't update document"){
        errors.findUser = "Can't update document with not registered email";

    }

    if(err.message.includes("Cast to ObjectId failed for value"))
    {
        errors.findDocument = "Document is not Exists";
    }

    return errors;
}


module.exports = { getAllDocs, createDoc, getById, updateDoc, deleteDoc}