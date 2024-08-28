import toast from "react-hot-toast";


const toasted = {
    success: async function (message: any) {
        toast.success(message, {
            style: {
                border: '0.6px solid #30e87a58',
                padding: '16px',
                color: '#fff',
                background: 'rgb(45 45 47)',
              },
              iconTheme: {
                primary: '#30E87A',
                secondary: '#FFFAEE',
              },
        })
    },
    error: async function (message: any) {
        toast.error(message, {
            style: {
                border: '0.6px solid #30e87a58',
                padding: '16px',
                color: '#fff',
                background: 'rgb(45 45 47)',
              },
              iconTheme: {
                primary: '#30E87A',
                secondary: '#FFFAEE',
              },
        });
    }
}
export default toasted;