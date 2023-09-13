using System;
using System.Collections.Generic;

namespace tucuongbackend.Models;

public partial class Account
{
    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Image { get; set; }

    public int Age { get; set; }

    public bool Sex { get; set; }
}
