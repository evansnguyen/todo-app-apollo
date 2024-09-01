import {Box, Card, CardContent, Fab, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TasksSection = () => {

    return (
        <Box sx={{p: 3}}>
            {/* Header Section */}
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                    All Tasks
                </Typography>
            </Box>

            {/* Divider Underline */}
            <Box sx={{borderBottom: '2px solid #2ecc71', width: '50px', mb: 3}}/>

            {/* Add New Task Card */}
            <Card sx={{
                border: '2px dashed #4A4A4A',
                backgroundColor: '#E0E0E0',
                color: '#2D2F31',
                cursor: 'pointer',
                maxWidth: '300px',
                '&:hover': {
                    backgroundColor: '#D0D0D0', // Darker grey on hover
                },
            }}>
                <CardContent sx={{textAlign: 'center'}}>
                    <AddIcon sx={{fontSize: 40, mb: 2}}/>
                    <Typography variant="h6">
                        Add New Task
                    </Typography>
                </CardContent>
            </Card>

            {/* Floating Action Button (FAB) */}
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    backgroundColor: '#2ecc71',
                    '&:hover': {backgroundColor: '#27ae60'},
                }}
            >
                <AddIcon/>
            </Fab>
        </Box>
    );
};

export default TasksSection;
