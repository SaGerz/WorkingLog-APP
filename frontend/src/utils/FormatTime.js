import dayjs from 'dayjs'

const formatTime = (time) => {
    return dayjs(`1970-01-01T${time}`).format('hh:mm A');
}

const formatDate = (date) => {
    return dayjs(date).format('MMMM D, YYYY');
}

export default { formatTime,  formatDate};


