module.exports = {

    //General
    serverConnected : (port)=>`Server connected on Port ${port}`,
    dbConnected:"Connected to db",
    dbSync : "db is set to sync",
    internalServerError:"Internal Server Error",
    emailExists:"Email already exists",
    userExists:"User already exists",
    unAuthorizedToken:'Unauthorized: Token not provided',
    invalidToken:'Forbidden: Invalid token',

    //Books Controller
    bookExists : "The book already exists",
    bookCreated : "Created a new Book",
    booksRetreived :`Retreived all books`,
    bookNotFound :"Book not found",
    getBookById :(id)=>`Retreived book of id ${id}`,
    bookUpdated:"Book updated successfully",
    bookDeleted :"Book deleted successfully",

    //User Controller
    userSignUp:"User signup is successful",
    invalidCredential :"Invalid email or password",
    successfulLogin:"User is successfully logged in",
    userNotFound:"User not found",

    //UserBook Controller
    userBookAdded :"Book added to User",
    userBookExists:"The Book was already added to the User",
    userBooksRetreived :(userId)=> `All books of User ${userId} have been retrieved.`,
    userBookNotFound:(userId)=>`No books found for the user with ID ${userId}.`,
    getAllUsersByBookId:(bookId)=>`All users of Book ${bookId} have been retrieved.`,
    userNotFoundByBookId:(bookId)=>`No users found for the book with ID ${bookId}.`,
    userBookUpdated:"Book of the user updated successfully",
    userBookDeleted :"Book deleted successfully for the User",
    userBookNotFound :"Book not found for the User"

}
