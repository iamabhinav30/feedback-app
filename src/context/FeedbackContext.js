import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {

  const [isLoading, setIsLoading]=useState(true);
  const [feedback, setFeedback] = useState([]);

  
  const [feedbackEdit, setFeedbackEdit]=useState({
    item:{},
    edit: false
  });

  useEffect(()=> {
    fetchFeedback();
  },[]);

  // Fetch feedback
  const fetchFeedback  = async () => {
    const response = await fetch(`/feedback?_sort=id&order=desc`);
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  }

  // Set items to be updated
  const editFeedback = (item)=>{
    setFeedbackEdit({
      item,
      edit:true
    })
  }

  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      await fetch(`/feedback/${id}`,{method:'DELETE'})
      setFeedback(feedback.filter((item) => item["id"] !== id));
    }
  };

  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback',{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body :JSON.stringify(newFeedback)
    });

    const data = await response.json();

    // newFeedback.id = uuidv4();
    setFeedback([data, ...feedback]);
    // console.log(newFeedback);
  };

  const updateFeedback = async (id, updateItem)=>{
    const response = await fetch(`/feedback/${id}`, 
                          {
                            method : 'PUT',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updateItem)
                          });
    const data = await response.json();
   setFeedback(feedback.map(
                  (item)=>
                        item.id === id 
                        ? {...item, ...data}
                        : item))
  }
  return (
    <FeedbackContext.Provider 
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
        }}>
          {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;