package com.example.springbootecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "state")
@Data
public class State {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private  Country country;
}
