import dayjs from 'dayjs'

const formatTime = (time) => {
    return dayjs(`1970-01-01T${time}`).format('hh:mm A');
}

export default formatTime;