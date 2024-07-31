document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registro-form');
    const relatorioForm = document.getElementById('relatorio-form');
    const configuracaoForm = document.getElementById('configuracao-form');
    const analiseMensal = document.getElementById('analise-mensal');
    const relatorioDiv = document.getElementById('relatorio');
  
    if (registroForm) {
      registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const data = {
          date: document.getElementById('date').value,
          lunch: parseInt(document.getElementById('lunch').value),
          dinner: parseInt(document.getElementById('dinner').value),
          snack: parseInt(document.getElementById('snack').value),
          soda: parseInt(document.getElementById('soda').value),
        };
  
        try {
          const response = await fetch('/api/meals', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
  
          const responseData = await response.json();
  
          if (response.ok) {
            alert('Refeição registrada com sucesso!');
            registroForm.reset();
          } else {
            alert('Erro ao registrar a refeição: ' + responseData.error);
          }
        } catch (error) {
          alert('Erro ao registrar a refeição: ' + error.message);
        }
      });
    }
  
    if (relatorioForm) {
      relatorioForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
  
        try {
          const response = await fetch(`/api/meals?month=${month}&year=${year}`);
          const meals = await response.json();
  
          if (response.ok) {
            relatorioDiv.innerHTML = '';
            meals.forEach(meal => {
              const mealDiv = document.createElement('div');
              mealDiv.textContent = `Data: ${meal.date}, Almoços: ${meal.lunch}, Jantas: ${meal.dinner}, Lanches: ${meal.snack}, Refrigerantes: ${meal.soda}`;
              relatorioDiv.appendChild(mealDiv);
            });
          } else {
            relatorioDiv.textContent = 'Erro ao buscar as refeições: ' + meals.error;
          }
        } catch (error) {
          relatorioDiv.textContent = 'Erro ao buscar as refeições: ' + error.message;
        }
      });
    }
  
    if (configuracaoForm) {
      configuracaoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const data = {
          lunchPrice: parseFloat(document.getElementById('lunch-price').value),
          dinnerPrice: parseFloat(document.getElementById('dinner-price').value),
          snackPrice: parseFloat(document.getElementById('snack-price').value),
          sodaPrice: parseFloat(document.getElementById('soda-price').value),
        };
  
        try {
          const response = await fetch('/api/prices', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
  
          const responseData = await response.json();
  
          if (response.ok) {
            alert('Configurações salvas com sucesso!');
            configuracaoForm.reset();
          } else {
            alert('Erro ao salvar as configurações: ' + responseData.error);
          }
        } catch (error) {
          alert('Erro ao salvar as configurações: ' + error.message);
        }
      });
  
      const fetchPrices = async () => {
        try {
          const response = await fetch('/api/prices');
          const prices = await response.json();
  
          if (response.ok && prices) {
            document.getElementById('lunch-price').value = prices.lunchPrice;
            document.getElementById('dinner-price').value = prices.dinnerPrice;
            document.getElementById('snack-price').value = prices.snackPrice;
            document.getElementById('soda-price').value = prices.sodaPrice;
          }
        } catch (error) {
          console.error('Erro ao buscar as configurações de preços:', error);
        }
      };
  
      fetchPrices();
    }
  
    if (analiseMensal) {
      const fetchMeals = async () => {
        const month = '07'; // Exemplo: julho
        const year = '2024'; // Exemplo: 2024
        try {
          const response = await fetch(`/api/meals?month=${month}&year=${year}`);
          const meals = await response.json();
  
          if (response.ok) {
            analiseMensal.innerHTML = '';
            meals.forEach(meal => {
              const mealDiv = document.createElement('div');
              mealDiv.textContent = `Data: ${meal.date}, Almoços: ${meal.lunch}, Jantas: ${meal.dinner}, Lanches: ${meal.snack}, Refrigerantes: ${meal.soda}`;
              analiseMensal.appendChild(mealDiv);
            });
          } else {
            analiseMensal.textContent = 'Erro ao buscar as refeições: ' + meals.error;
          }
        } catch (error) {
          analiseMensal.textContent = 'Erro ao buscar as refeições: ' + error.message;
        }
      };
  
      fetchMeals();
    }
  });
