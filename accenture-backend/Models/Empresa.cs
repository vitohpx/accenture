using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace accenture_backend.Models
{
    public class Empresa
    {
        [Key]
        public string CNPJ { get; set; }

        public string NomeFantasia { get; set; }

        public string CEP { get; set; }

        //public List<Fornecedor> Fornecedores { get; set; }
    }
}
