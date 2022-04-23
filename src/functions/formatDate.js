import moment from 'moment';
moment.updateLocale('pt', {
    months : [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]
});
function formatDate(data) {
    const modifiedData = data.map((item) => {
        const {birthdate, appointmentDate} = item
        item.birthdate = moment(birthdate).local().utc(0, true).format("DD/MM/YYYY")
        item.appointmentDate = moment(appointmentDate).local().utc(0, true).format("DD MMMM YYYY HH:mm")
        return item
    })
    return modifiedData
}

export default formatDate