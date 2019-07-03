namespace AddressListApi.Models
{
    public class AddressListItem
    {
        public long Id {get; set;}
        public string Firstname {get; set;}
        public string Lastname {get; set;}
        public string City {get; set;}
        public bool IsComplete {get; set;}
    }
}