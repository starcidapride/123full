﻿using System;
using System.Collections.Generic;

namespace tucuongbackend.Models;

public partial class Plant
{
    public string PlantId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Image { get; set; } = null!;

    public string Description { get; set; } = null!;

    public double Price { get; set; }

    public int Quantity { get; set; }
}
