export const convertDateFunction = (item:string):string=>{
    let date = new Date(item);

    // Extract month, day, and year from the Date object
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear();

    // Format the date as MM-DD-YYYY
    let formattedDate = `${month}-${day}-${year}`;

    return(formattedDate); 
}