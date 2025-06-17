import { SelectedDate } from "@/types/Date";

export const createSelectedDate = (date: Date): SelectedDate => {
    return {
        date: date,
        display: date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            weekday: 'long',
        }),
        isoString: date.toISOString().split('T')[0] // Formato YYYY-MM-DD
    };
}

export const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        weekday: 'long'
    });
}

export const isDateAvailable = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera as horas, minutos, segundos e milissegundos

    // const dayOfWeek = date.getDay(); // caso haja algum dia off
    const maxDate =  new Date();
    maxDate.setDate(maxDate.getDate() + 60); // Define a data máxima

    return date >= today && date <= maxDate;
}

export const getUnavailableDates = (): Date[] => {
    // apenas mock, pois vai vir do backend
    const unavailable: Date[] = [];
    const today = new Date();

    return unavailable;
} 