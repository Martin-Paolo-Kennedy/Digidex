import React, { useState, useEffect } from 'react';

interface Image {
    href: string;
    transparent: boolean;
}

interface Level {
    id: number;
    level: string;
}

interface Type {
    id: number;
    type: string;
}

interface Attribute {
    id: number;
    attribute: string;
}

interface Field {
    id: number;
    field: string;
    image: string;
}

interface Description {
    origin: string;
    language: string;
    description: string;
}

interface Skill {
    id: number;
    skill: string;
    translation: string;
    description: string;
}

interface Evolution {
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
}

interface Digimon {
    id: number;
    name: string;
    xAntibody: boolean;
    images: Image[];
    levels: Level[];
    types: Type[];
    attributes: Attribute[];
    fields: Field[];
    releaseDate: string;
    descriptions: Description[];
    skills: Skill[];
    priorEvolutions: Evolution[];
    nextEvolutions: Evolution[];
}

interface DigimonProps {
    id: number;
}

const Digimon: React.FC<DigimonProps> = ({ id }) => {
    const [digimon, setDigimon] = useState<Digimon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDigimon = async () => {
            try {
                let url: string;
                if (isNaN(Number(id))) {
                    // Search by name
                    url = `https://digi-api.com/api/v1/digimon/name/${id}`;
                } else {
                    // Search by ID
                    url = `https://digi-api.com/api/v1/digimon/${id}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Digimon not found');
                }

                const data: Digimon = await response.json();
                setDigimon(data);
                setLoading(false);
                setError(null);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Ocurrio un error desconocido');
                }
                setLoading(false);
            }
        };

        fetchDigimon();
    }, [id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div >
            <div className="cardS">
                <div className="card-image">
                    <img src={digimon?.images[0].href} alt={digimon?.name} />
                </div>
                <div className="card-content">
                    <h4>ID: {digimon?.id}</h4>
                    <p>X-Antibody: {digimon?.xAntibody ? 'Yes' : 'No'}</p>
                    <h4><b>Nivel: </b></h4>{digimon?.levels.map(level => (
                        <li key={level.id}>{level.level}</li>
                    ))}
                    <p><h4><b>Tipos: </b></h4>{digimon?.types.map(type => (
                        <li key={type.id}>{type.type}</li>
                    ))}</p>
                    <p><h4><b>Atributos: </b></h4>{digimon?.attributes.map(attribute => (
                        <li key={attribute.id}>{attribute.attribute}</li>
                    ))}</p>
                    <p><h4><b>Campos: </b></h4><div className="row row-cols-auto justify-content-center">
                        {digimon?.fields.map(field => (
                            <div key={field.id} className="col text-center">
                                <img src={field.image} alt={field.field} className="img-fluid" />
                                <p>{field.field}</p>
                            </div>
                        ))}
                    </div></p>
                </div>
            </div>





            <div className="card mb-5">
                <div className="card-header">
                    <h2>Descripción</h2>
                </div>
                <div className="card-body">
                    {digimon?.descriptions.map(description => (
                        <p key={description.origin}>
                            <strong>{description.language}:</strong> {description.description}
                        </p>
                    ))}
                </div>
            </div>


            <div className="card hab">
                <div className="card-header">
                    <h2>Habilidades</h2>
                </div>
                <div className="card-body">
                    {digimon?.skills.map(skill => (
                        <p key={skill.id}>
                            <strong>{skill.skill}:</strong> {skill.description}
                        </p>
                    ))}
                </div>
            </div>

            <h2>Evoluciones Anteriores</h2>
            <div className="row mea">
                {digimon?.priorEvolutions.map(evolution => (
                    <div key={evolution.id} className="col-md-3 col-sm-4 col-6">
                        <div className="card mb-3">
                            <img src={evolution.image} alt={evolution.digimon} className="card-img-top" />
                            <div className="card-body">
                                <p className="card-text">{evolution.digimon}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h2>Proximas Evoluciones</h2>
            <div className="row">
                {digimon?.nextEvolutions.map(evolution => (
                    <div key={evolution.id} className="col-md-3 col-sm-4 col-6">
                        <div className="card mb-3">
                            <img src={evolution.image} alt={evolution.digimon} className="card-img-top" />
                            <div className="card-body">
                                <p className="card-text">{evolution.digimon}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Digimon;
