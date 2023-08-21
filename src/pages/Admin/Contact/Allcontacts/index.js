import  React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { db } from '../../../../firebase';
import Post from './Post';
import { Pagination } from '@mui/material';



export default function Allcontacts({ filteredPosts, searchTerm }) {
    const [posts, setPosts] = React.useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const pageSize = 10; // Number of posts per page

     React.useEffect(() => {
         db.collection('contacts').orderBy("timestamp","desc").onSnapshot(snapshot => {
             setPosts(snapshot.docs.map(doc => ({
                 id: doc.id,
                 post: doc.data(),
             })));
         })
     }, []);

  // Calculate the total number of pages based on the posts array length and page size
  const totalPages = Math.ceil(posts.length / pageSize);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Get the posts for the current page
  const getCurrentPosts = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return posts.slice(startIndex, endIndex);
  };

  useEffect(() => {
    // Save the current page before updating the data
    setPrevPage(currentPage);
  }, [posts]);

  useEffect(() => {
    // Set the current page back to its previous value after data update
    setCurrentPage(prevPage);
  }, [prevPage]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
            <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">FULL NAME</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">EMAIL</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">PHONE NO.</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">MESSAGE</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">READ STATUS</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">DATE SENT</TableCell>
            <TableCell style={{minWidth:100,fontSize:12,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #2a68af",color:"#2a68af"}} align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {searchTerm === '' ? (
            posts?.length > 0 ? (
              getCurrentPosts().map(({id, post}) => (
                <Post
                key={id} 
                id={id}
                fullName={post.fullName}
                email={post.email}
                phone={post.phone}
                message={post.message}
                readStatus={post.isRead}
                timestamp={post.timestamp}
                />
              ))
            ) : (
              <div style={{ display: 'table', margin: 'auto', fontSize: 18, fontWeight: 'bold' }}>Loading...</div>
            )
          ) : (
            <>
              {filteredPosts?.length > 0 ? (
                filteredPosts.map((posts2) => (
   
                  <Post 
                  id={posts2.id}
                  fullName={posts2.fullName}
                  email={posts2.email}
                  phone={posts2.phone}
                  message={posts2.message}
                  readStatus={posts2.isRead}
                  timestamp={posts2.timestamp}
                  />
                  ))
              ) : (
                <><center style={{ fontWeight: 'bold' }}><h5>No results...</h5></center></>
              )}
            </>
          )}
        </TableBody>
        </Table>
      </TableContainer>

      {posts.length > pageSize && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
      )}
    </Paper>
  );
}
