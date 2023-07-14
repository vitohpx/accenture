using accenture_backend.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.ConstrainedExecution;
using System.Text.Json;

namespace accenture_backend.Utils
{
    public class FornecedorUtils
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        public static async Task<bool> ValidateCepAsync(string cep)
        {

            string url = $"http://cep.la/{cep}";

            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    if (!jsonResponse.Contains("Nada encontrado, tente outro pedido"))
                    {
                        return true;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }

            return false;
        }


        public static async Task<bool> IsParanaEmpresaAsync(Empresa company)
        {
            string url = $"http://cep.la/{company.CEP}";

            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    if (jsonResponse.Contains("PR"))
                    {
                        return true;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }

            return false;
        }

        public static bool IsFornecedorMaiorIdade(DateTime? birthDate)
        {
            if (birthDate == null)
                return false;

            var minimumAge = 18;
            var currentDate = DateTime.Now;
            var birthDateValue = birthDate.Value;
            var supplierAge = currentDate.Year - birthDateValue.Year;

            if (birthDateValue > currentDate.AddYears(-supplierAge))
            {
                supplierAge--;
            }

            if (supplierAge >= minimumAge)
            {
                return true;
            }

            return false;
        }

    }
}
