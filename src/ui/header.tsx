"use client";

import React from 'react';
import { Button, TextInput } from '@tremor/react';
import { Card } from '@tremor/react';
import { RiHomeSmileFill, RiAddLine } from '@remixicon/react';
import { useState } from 'react';
import ProductService from '@/services/ProductService';

const Header = () => {
    var [url, setUrl] = useState('');
    var [name, setName] = useState('');

    function addProduct() {
        const regex = /\b\d{16}\b/;
        const match = url.match(regex);
        var id =  match ? match[0] : null;

        ProductService.addProduct({id: id, name: name, url: 'deprecated'}).then(response => {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Card className='h-full m-0 rounded-none bg-tremor-brand-subtle'>
            <div className="flex items-center justify-between ">
                <div className="float-left">
                    <Button className="rounded-lg bg-tremor-secondary-emphasis" icon={RiHomeSmileFill} iconPosition="left" size="lg" variant="primary">Gilly Bates</Button>
                </div>

                <div className="float-center flex">
                    <TextInput className="text-tremor-brand-subtle rounded-lg" onValueChange={(value) => setName(value)} placeholder="Product naam" />
                    <TextInput className="text-tremor-brand-subtle rounded-lg" onValueChange={(value) => setUrl(value)} placeholder="Product url" />
                    <Button onClick={addProduct} className="float-right text-tremor-brand-subtle bg-tremor-secondary-emphasis rounded-lg" icon={RiAddLine}/>
                </div>

                <div className="float-right pr-3">
                    <Button className="text-tremor-secondary-emphasis" size="lg" variant="light">Logout</Button>
                </div>
            </div>
        </Card>
    );
};

export default Header;