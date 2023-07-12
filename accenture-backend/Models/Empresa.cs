using System.ComponentModel.DataAnnotations;

namespace accenture_backend.Models
{
    public class Empresa
    {
        [Key]
        public string CNPJ { get; set; }

        public string NomeFantasia { get; set; }

        public string CEP { get; set; }

        public List<Fornecedor> Fornecedores { get; set; }
    }
}
