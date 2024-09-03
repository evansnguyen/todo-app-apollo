import {useContext, useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, IconButton, Modal, TextField, Typography,} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import {useGlobalState} from "../../contexts/globalProvider.tsx";
import {useAmplifyClient} from "../../contexts/amplifyClientContext.tsx";
import {createTask} from "../../graphql/mutations.js";
import {AuthContext} from "../../contexts/authContext.tsx";

const TaskModal = ({}) => {
    const {modal: open, closeModal} = useGlobalState();
    const amplifyClient = useAmplifyClient()
    const {currentUser} = useContext(AuthContext)

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        date: '',
        isCompleted: false,
        isImportant: false,
        userID: currentUser.userID
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmitTaskCreation = async (taskData) => {
        await amplifyClient.graphql({
            query: createTask,
            variables: {
                input: {
                    ...taskData,
                    userID: currentUser.userID
                }
            }
        });
    }

    const handleFormSubmit = async () => {
        const formattedData = {
            ...taskData,
            date: new Date(taskData.date).toISOString()
        }
        await handleSubmitTaskCreation(formattedData)
        closeModal();
    };

    return (
        <Modal open={open} onClose={closeModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={closeModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'grey.500',
                    }}
                >
                    <CloseIcon/>
                </IconButton>

                <Typography variant="h6" component="h2" mb={2}>
                    Create a Task
                </Typography>

                <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    value={taskData.title}
                />
                <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    value={taskData.description}
                />
                <TextField
                    label="Date"
                    name="date"
                    type="date"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    value={taskData.date}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isCompleted"
                            checked={taskData.isCompleted}
                            onChange={handleChange}
                        />
                    }
                    label="Toggle Completed"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isImportant"
                            checked={taskData.isImportant}
                            onChange={handleChange}
                        />
                    }
                    label="Toggle Important"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFormSubmit}
                    sx={{mt: 2}}
                    fullWidth
                >
                    Create Task
                </Button>
            </Box>
        </Modal>
    );
};

export default TaskModal;
