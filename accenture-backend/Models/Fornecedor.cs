using System.ComponentModel.DataAnnotations;

namespace accenture_backend.Models
{
    public class Fornecedor
    {
        [Key]
        public string CNPJCPF { get; set; }

        public string Nome { get; set; }

        public string Email { get; set; }

        public string CEP { get; set; }

        public string RG { get; set; }

        public DateTime? DataNascimento { get; set; }

        public List<string> EmpresaCNPJ { get; set; }
    }
}
