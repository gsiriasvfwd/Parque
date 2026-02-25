async function getAttractions() {
    try {
        const response = await fetch('http://localhost:3002/attractions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching users');
        }

        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

//////////LLAMADO POST//////////

async function postAttractions(atraccion) {
    try {

        const response = await fetch("http://localhost:3002/attractions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atraccion)
        });

     
        return await response.json();

        
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

//////////////LLAMADO UPDATE/////////////


async function updateAttractions(id, atraccion) 
{
    try {

        const response = await fetch("http://localhost:3002/attractions/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(atraccion)
        });

     
        return await response.json();
    } catch (error) {
        console.error('Error update user:', error);
        throw error;
    }
}




//////////////LLAMADO DELETE/////////////


async function deleteAttractions(id) {
    try {
        const response = await fetch(`http://localhost:3002/attractions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export { getAttractions, postAttractions, updateAttractions, deleteAttractions };
