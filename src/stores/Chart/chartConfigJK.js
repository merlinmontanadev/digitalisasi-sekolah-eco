import { fetchCountDataMurid } from '@/services/murid/Murid.js'

export async function fetchData() {
  try {
    const response = await fetchCountDataMurid();
    
    // Mengambil hanya jenis kelamin
    const genderData = response.data.map(item => item.jenis_kelamin);
    
    // Menghitung jumlah setiap jenis kelamin
    const maleCount = genderData.filter(jenis_kelamin => jenis_kelamin === 'Pria').length;
    const femaleCount = genderData.filter(jenis_kelamin => jenis_kelamin === 'Wanita').length;
    
    return {
      labels: ['Pria', 'Wanita'],
      seriesData: [maleCount, femaleCount]
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      labels: [],
      seriesData: []
    };
}
}